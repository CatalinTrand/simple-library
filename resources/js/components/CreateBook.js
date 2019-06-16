import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {attemptPost} from "../helpers";

export default class CreateBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTags: []
        }
    }


    saveChanges (){

        let name = document.querySelector("input[name=title]").value;

        let e = document.querySelector("select[name=author_id]");
        let author_id = e.options[e.selectedIndex].value;

        let tags = "";
        for(let i = 0; i < this.state.selectedTags.length; i++){
            if(tags !== "")
                tags += ";";
            tags += this.state.selectedTags[i].name + "";
        }

        let description = document.querySelector("textarea[name=description]").value;

        let cover_image = document.querySelector("input[type=file]").files[0];

        let formData = new FormData();
        formData.append("name",name);
        formData.append("author_id",author_id);
        formData.append("tags",tags);
        formData.append("description",description);
        if(cover_image != null)
            formData.append("cover_image",cover_image);

        attemptPost( "books/create", formData,
            response => {
                if(response.status === 201)
                    location.reload();
                else
                    document.querySelector("p#error-msg").innerHTML = "Error creating the book. Invalid inputs";
            }
        );

    }
    render() {
        return (
            <div>
                <h2>Add new Book</h2>
                <p id="error-msg" style={{color:'red'}}></p> <br/>
                Title: <br/>
                <input type="text" name="title" /> <br/>
                Author: <br/>
                <select name="author_id">
                    {
                        this.props.authors.map(
                            author => <option value={author.id}>{author.name}</option>
                        )
                    }
                </select> <br/>

                Tags: <br/>
                <div className="tags-div">
                    {
                        this.props.tags.map(
                            tag =>
                                <div
                                        onClick={(e) => {
                                            let index = this.state.selectedTags.indexOf(tag);
                                            if(index > -1)
                                                this.state.selectedTags.splice(index,1);
                                            else
                                                this.state.selectedTags.push(tag);
                                            this.forceUpdate();
                                        }}
                                        className={"tag-div" + (this.state.selectedTags.indexOf(tag)  > -1 ? " selected" : "")}
                                >{tag.name}</div>
                        )
                    }
                </div> <br/>
                Description: <br/>
                <textarea name="description" /> <br/>
                Cover image: <br/>
                <input type="file" name="cover_image"/> <br/>
                <div className="bottom-buttons">
                    <div onClick={(e) => this.saveChanges() }>Save</div>
                    <div onClick={(e) => this.props.parent.setState({viewMode: -1}) }>Cancel</div>
                </div>
            </div>
        );
    }
}