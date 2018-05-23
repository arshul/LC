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
            keyword : '',
            videos : []
        };

        this.updateInput = this.updateInput.bind(this);
    }
    updateInput(event){
        this.setState({keyword : event.target.value})
    }
    // componentDidMount(data) {
    //     this.videoList(data);
    // }
    videoList(result){
        this.setState({videos:result.search});
    }

    render() {
        const videos = this.state.videos.map((video, i) => (
            <div>
                <h1>{ video.title }</h1>
                <span>{ video.description }, { video.id }</span>
            </div>
        ));
        const buttonStyle = {
            color: '#444444',
            background: '#F3F3F3',
            border: '1px #DADADA solid',
            padding: '5px 10px',
            borderRadius: '2px',
            fontWeight: 'bold',
            fontSize: '9pt',
            outline: 'none'

        };
        const inputStyle = {
            fontFamily: 'Open Sans Condensed, arial, sans',
            width: '250px',
            padding: '4px',
            background: '#FFFFFF',
            marginLeft: '500px'
        };
        return <div>
            <div>
            <input style={inputStyle} type="text" onChange={this.updateInput}/>
                <ApolloConsumer>
                    {client => (<button style={buttonStyle}
                        onClick={async () => {
                            const { data } = await client.query({
                                query: searchQuery,
                                variables: { search_query: this.state.keyword }
                            });
                            this.videoList(data) // send this data to output
                        }}
                    >
                        Search
                    </button>
                    )}
                </ApolloConsumer>
            </div>
            <div id="layout-content" className="layout-content-wrapper">
                <div className="panel">{ videos }</div>
            </div>
        </div>;
    }
}
class Header extends React.Component{
    render(){
        return <div>
            <img style={{paddingBottom:"35px",marginLeft:"340px"}} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAApgAAABRCAYAAAB2SdacAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdBMzEwOUIyNDM3QTExRThCMkY2OTk1MTIwNkVDRkRDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdBMzEwOUIzNDM3QTExRThCMkY2OTk1MTIwNkVDRkRDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0EzMTA5QjA0MzdBMTFFOEIyRjY5OTUxMjA2RUNGREMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0EzMTA5QjE0MzdBMTFFOEIyRjY5OTUxMjA2RUNGREMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ee0YcAAAXFElEQVR42uxd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"}></img>
        </div>
    }
}
class  App extends React.Component {
  render() {
    return <div>
        <Header/>
        <Input/>
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

