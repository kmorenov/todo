import React, {Component} from 'react';
import './App.css'

import Albums from './Cart/Albums'
import Photos from "./Cart/Photos"

import {BrowserRouter, Router, Route, Switch, NavLink} from 'react-router-dom';
import CartContent from "./Cart/CartContent";
import PhotoInfo from "./Cart/PhotoInfo";

class App extends Component {

    state = {
        albumIds: [],
        photos: [],
        albumPhotos: [],
        counter: 0,
        cartItems: []
    }

    getAlbums = () => {
        return fetch(`https://jsonplaceholder.typicode.com/albums`)
            .then((response) => response.json())
            .then((response) => {
                let unqAbumId
                const arr = []
                for (let i = 0; i < response.length; i++) {
                    arr[i] = response[i].userId
                }
                for (let i = 0; i < arr.length; i++) {
                    unqAbumId = arr.reduce(
                        (distinct, albums) =>
                            (distinct.indexOf(albums) !== -1) ?
                                distinct :
                                [...distinct, albums],
                        []
                    )
                }
                this.setState({albumIds: unqAbumId})
            })
    }

    getPhotos = () => {
        return fetch(`https://jsonplaceholder.typicode.com/photos`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({photos: response})
            })
    }

    getAlbumPhotos = (albumId) => {
        const albumPhotos = this.state.photos ?
            this.state.photos.filter(photo => (photo.albumId == albumId)) :
            this.getPhotos()
        this.setState({albumPhotos})
    }

    updateCounter = (photo) => {
        /* my attempt to remove bought items. No point as the item reappeats when the album is selected again*/
        // this.state.albumPhotos.splice((photo.id / ((photo.albumId - 1) * 50) - 1), 1)
        // this.setState({albumPhotos: this.state.albumPhotos})
        /*        const photos = this.state.albumPhotos.filter(pht => (
                    pht.id !== photo.id));*/
        // this.setState({albumPhotos: photos, counter : this.state.counter+1})
        this.setState({counter: this.state.counter + 1})
        // alert('Albums Id: ' + photo.albumId + ' Photos Id: ' + photo.id)

        // this.setState({ coinsList: Object.keys(responce.Data).slice(0, 10).map(key => responce.Data[key]) }))
        /*        console.log(this.state.cartItems);*/
        let arr = [...this.state.cartItems]
        arr.push(photo.id)
        this.setState({cartItems: arr})
    }

    filterListById = (list, id) => {
        console.log(list)
        const selectedPhoto = list.find(photo => photo.id == id)
        console.log(selectedPhoto)
        this.setState({albumPhotos : selectedPhoto})
    }

    componentDidMount() {
        this.getAlbums()
        this.getPhotos()
    }

    render() {
        return (
            <BrowserRouter>
                <div id="wrapper" className="container">
                    <NavLink to="/" activeClassName="active" exact><strong>Home </strong></NavLink>
                    <NavLink to="/cart" activeClassName="active"><strong>Cart: </strong>{this.state.counter}</NavLink>
                    <Switch>
                        <Route path="/cart"
                               component={props => <CartContent {...props} counter={this.state.counter}
                                                                cartItems={this.state.cartItems}/>}
                        />
                        <Route
                            path="/photoinfo/:id"
                            component={props => <PhotoInfo
                            {...props} //photo={this.filterListById(this.state.photos, props.match.params.id)}/>}/>
                            photo={props.match.params.id}
                            updateCounter={this.updateCounter}/>}/>

                        <div className="row">
                            <Albums albums={this.state.albumIds} getAlbumPhotos={this.getAlbumPhotos}/>
                            <Photos
                                photos={this.state.albumPhotos.length ? this.state.albumPhotos : this.state.photos}
                                updateCounter={this.updateCounter}
                            />
                        </div>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
