import React from 'react'
import { graphql , ApolloConsumer} from 'react-apollo'
import { gql } from 'apollo-boost'


const searchQuery =gql`
query youtubeSearch($search_query: String!) {
    search(search_query: $search_query){
        id 
        description 
        channel 
        title 
        thumb_url
    }
}`;
class Input extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            keyword : ''
        };

        this.updateInput = this.updateInput.bind(this);
    }
    updateInput(event){
        this.setState({keyword : event.target.value})
    }
    render() {
        return <div>
            <div>
            <input type="text" onChange={this.updateInput}/>
                <ApolloConsumer>
                    {client => (<button
                        onClick={async () => {
                            const { data } = await client.query({
                                query: searchQuery,
                                variables: { search_query: this.state.keyword }
                            });
                            console.log(data) // send this data to output
                        }}
                    >
                        Click me!
                    </button>
                    )}
                </ApolloConsumer>
            </div>
        </div>;
    }
}
class Output extends React.Component{
    render(){
        return <div>

        </div>
    }
}
class  App extends React.Component {
  render() {
    return <div>
        <Input/>
        <Output/>
          {/*{this.props.data.loading === true ? "Loading" : this.props.data.search.map(data =>*/}
              {/*<ul>*/}
                {/*<li key={data.id} style={{fontWeight: 'bold'}}><a href={"https://youtu.be/"+data.id}>{data.title}</a></li>*/}
              {/*</ul>*/}
            {/*)}*/}
    </div>;
  }
}
// const AppWithData = graphql(searchQuery, {options: {variables: {search_query:"mkbhd"}}})(App);

export default App;

