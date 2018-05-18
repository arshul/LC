import React from 'react'
import { graphql } from 'react-apollo'
import { gql } from 'apollo-boost'

// const POPULAR_REPOSITORIES_LIST = gql`
// {
//   search(query: "stars:>50000", type: REPOSITORY, first: 10) {
//     repositoryCount
//     edges {
//       node {
//         ... on Repository {
//           name
//           owner {
//             login
//           }
//           stargazers {
//             totalCount
//           }
//         }
//       }
//     }
//   }
// }
// `

class ListPage extends React.Component {
render () {
return (
      <div className='w-100 flex justify-center'>
        <div className='w-100' style={{ maxWidth: 400 }}>
          TODO: Display all posts...
        </div>
      </div>
    )
  }
}
const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Fetching Data...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul className="list-group">
  { channels.map( channel => <li class="list-group-item"key={channel.id}>{channel.name}</li> ) }
  </ul>;
 };
// console.log("app")
// const App = graphql(gql``)(ListPage)
// // (props =>{props})

// export default App
const USER_QUERY = gql`
query USER_QUERY {
  books
}
`;
const App = graphql(USER_QUERY)(ChannelsList)
export default App