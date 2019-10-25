import React, { Component } from 'react';
// import './FolderSelector.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import ApiContext from '../../ApiContext';

class FolderSelector extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            headerTitle: 'Choose A Folder',
        }
    }

    static contextType = ApiContext;

    handleClickOuter = () => {
        this.setState ({
            isOpen: false
        })
    }

    handleSetFolder = () => {
        const folderName = this.state.headerTitle;
        this.props.updateFolderId(folderName)
    }

    toggleDropdown = () => {
        console.log('dropdown called')
        console.log(this.state.headerTitle)

        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
        if (this.state.isOpen === false){
            this.setState ({
            ulClassName: 'dropdown-list'
            })
        } else {
            this.setState ({
                ulClassName: 'dropdown-list-hide'
            })
        }
    }

    changeHeader = (e) => {
        this.setState ({
            headerTitle: e.target.id
        }, function() {
            this.handleSetFolder();
        })
    }

    render () {
        return (
            <div className='folder-selector'>
                <div className='folder-title'
                onClick={() => this.toggleDropdown()}>
                    <p>{this.state.headerTitle}</p>
                    <span><FontAwesomeIcon icon='folder' /></span>
                </div>

                <ul className='folder-toggle'
                onClick={()=> this.toggleDropdown()}>
                    {this.props.folders.map(folder => 
                        <div key={folder.id}>
                            <li
                            key={folder.id}
                            className='dropdown-list-item'
                            itemID={folder.name}
                            onClick={(e) => this.changeHeader(e)}>{folder.name}</li>
                        </div>
                        )}
                </ul>
            </div>
        )
    }
}

library.add(faFolder)
export default FolderSelector;