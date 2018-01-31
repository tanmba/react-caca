import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesList: [],
            seriesEpisodesList: [],
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentDidMount() {
        fetch('seriesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesList: seriesListDepuisFichier});

            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                /*alert("j'ai fait ce que j'ai pu");*/
            });

        fetch('seriesEpisodesList.json',{})
            .then(response => response.json())
            .then(seriesListDepuisFichier => {
                this.setState({seriesEpisodesList: seriesListDepuisFichier});
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h1>Liste séries</h1>
                <input placeholder="Tape un truc" type="text" value={this.state.value} onChange={this.handleChange} />
                <ul>
                    {this.state.value !== "" ?
                        this.state.seriesList.filter(
                            a => a.seriesName.toLowerCase().trim().indexOf(this.state.value) > -1
                        ).map(item =>
                            <li key={item.id}>{item.seriesName}
                                <ul>
                                    {
                                        this.state.seriesEpisodesList.filter(
                                            b => b.serie_id == item.id
                                        ).map(episode => episode.episodes_list.filter(
                                            c => c.episodeName
                                        ).map(name => <li>{name.episodeName}</li>)
                                        )
                                    }
                                </ul>
                            </li>)
                        : <li>Loading...</li>
                    }
                </ul>
            </div>
        )
    }
}
export default App;