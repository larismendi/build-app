import React from "react";
import { List, Avatar, Space } from "antd";
import { ForkOutlined, StarTwoTone } from "@ant-design/icons";
import { useQuery, gql } from "@apollo/client";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const GET_REPOSITORIES = gql`
  query {
    viewer {
      login
      name
      starredRepositories(first: 100) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          id
          name
          primaryLanguage {
            id
            name
            color
          }
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
        }
      }
    }
  }
`;

export default function Repositories(props) {
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          // console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={data.viewer.starredRepositories.nodes}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          actions={[
            <IconText
              icon={ForkOutlined}
              text={item.forkCount}
              key="list-vertical-star-o"
            />,
            <IconText
                icon={StarTwoTone}
                text={item.stargazerCount}
                key="list-vertical-like-o"
            />,
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar src={item.owner.avatarUrl} alt={item.owner.login} />
            }
            title={
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            }
            description={item.owner.login}
          />
          {item.description}
        </List.Item>
      )}
    />
  );
}
