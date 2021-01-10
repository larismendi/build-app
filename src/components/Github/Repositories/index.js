import React from "react";
import { List, Avatar, Space } from 'antd';
import { StarOutlined, ForkOutlined, StarTwoTone } from '@ant-design/icons';
import {
  useApolloClient,
  useQuery,
  gql 
} from "@apollo/client";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const GET_REPOSITORIES = gql`
  query {
    viewer {
      repositories(first: 100, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER]) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes{
          id
          name
          owner {
            avatarUrl
            login
          }
          description
          url
          licenseInfo {
            name
            description
          }
          forkCount
          stargazerCount
          viewerHasStarred
        }
      }
    }
  }
`;

const ADD_STAR = gql`
  mutation($id: String!) {
    addStar(input:{ starrableId: $id }){
      starrable {
        id
      }
    }
  }
`;

const REMOVE_STAR = gql`
  mutation($id: ID!) {
    removeStar(input: { starrableId: $id }) {
      starrable {
        id
      }
    }
  }
`;

export default function Repositories(props) {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  let dataSource = data.viewer.repositories.nodes.filter(item => 
    item.name.includes(props.filter)
  );

  function OnStar(id) {
    const client = useApolloClient();
    client.query({
      query: ADD_STAR,
      variables: {
        id: id
      },
    }).then((data) => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
    // let data = useQuery();
    // console.log(id);
  }

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          // console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={dataSource}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText 
              icon={ForkOutlined} 
              text={item.forkCount} 
              key="list-vertical-star-o" />,
            <span onClick={() => OnStar(item.id)}>
              <IconText 
                icon={item.viewerHasStarred ? StarTwoTone : StarOutlined} 
                text={item.stargazerCount}
                key="list-vertical-like-o" />
            </span>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar 
              src={item.owner.avatarUrl}
              alt={item.owner.login} />}
            title={<a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer">{item.name}</a>}
            description={item.owner.login}
          />
          {item.description}
        </List.Item>
      )}
    />
  );
}
