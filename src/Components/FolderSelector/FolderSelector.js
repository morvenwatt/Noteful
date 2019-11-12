import React, { Component } from 'react';
import './FolderSelector.css';
import ApiContext from '../../ApiContext';

class FolderSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            headerTitle: 'Choose A Folder',

        }
    }

    static contextType = ApiContext;

    handleClickOuter = () => {
        this.setState({
            isOpen: false
        })
    }

    handleSetFolder = () => {
        const folderName = this.state.headerTitle;
        this.props.updateFolderId(folderName)
    }
// ^^^ check out this ^^^

    changeHeader = (e) => {
        this.setState({
            headerTitle: e.target.id
        }, function () {
            this.handleSetFolder();
        })
    }


    render() {
        return (
            <div className='folder-selector'>
                <h3>Choose A Folder:</h3>
                <ul className='folder-list'
                    onClick={() => this.handleSetFolder()}>
                    <select required>
                        {this.context.folders.map(folder =>
                            <option
                                key={folder.id}
                                className='folder-list-item'
                                itemID={folder.name}
                                onClick={(e) => this.changeHeader(e)}>{folder.name}
                            </option>
                        )}
                    </select>
                </ul>
            </div>
        )
    }
}


export default FolderSelector;