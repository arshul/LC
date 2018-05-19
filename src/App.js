import React from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'


class  App extends React.Component {
  render() {
    return <div>
      {this.props.data.loading === true ? "Loading" : this.props.data.books.map(data =>
          <ul>
            <li style={{fontWeight: 'bold'}}><a href={data.author}>{data.title}</a></li>
          </ul>
        )}
    </div>;
  }
} 
const AppWithData = graphql(
  gql`query{books{title author}}`,
  {
    options: {
      variables: {
        name: "tuts"
      }
    }
  }
)(App)
 
export default AppWithData;
