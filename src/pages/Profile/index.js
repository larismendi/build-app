import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from "antd";
import { withRouter } from "react-router";
import Logo from '../../components/Logo';
import Content from '../../components/Profile';
import SiderComp from '../../components/Sider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './style.css';

const { Sider } = Layout;

class Profile extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;

    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Logo />
            <SiderComp />
          </Sider>
          <Layout className="site-layout">
            <Header />
            <Content />
            <Footer />
          </Layout>
        </Layout>
      </Router>
    );
  }
  // const [lists, setLists] = useState([]);

  // const getLists = () => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     axios
  //       .get("http://localhost:8001/lists/list", {
  //         headers: {
  //           Authorization: `Bearer ${jwt}`,
  //         },
  //       })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setLists(data.lists);
  //       })
  //       .catch((err) => {
  //         console.log(err.request);
  //       });
  //   }
  // };

  // useEffect(() => {
  //   getLists();
  // }, []);

  // return (
  //   <div>
  //     <Header />
  //     {lists ? (
  //       <Table>
  //         <Thead>
  //           <tr>
  //             <Th>Name</Th>
  //             <Th>Description</Th>
  //           </tr>
  //         </Thead>
  //         <Tbody>
  //           {lists.map((list, index) => {
  //             return (
  //               <tr key={index}>
  //                 <Td>{list.name}</Td>
  //                 <Td>{list.discription}</Td>
  //               </tr>
  //             );
  //           })}
  //         </Tbody>
  //       </Table>
  //     ) : null}
  //   </div>
  // );
}

export default withRouter(Profile);
