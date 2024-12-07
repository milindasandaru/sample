/*import './App.css';
import { Component } from 'react';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      notes:[]
    }
  }

  API_URL = "http://localhost:5040/";

  componentDidMount() {
    this.refreshNotes();
  }

  async refreshNotes(){
    fetch(this.API_URL + "api/todoapp/GetNotes").then(response => response.json())
    .then(date => {
      this.setState({notes:date});
    })
  }

  async addClick(){
    var newNotes = document.getElementById("newNotes").value;
    const data = new FromData();
    data.append("newNotes", newNotes);

    fetch(this.API_URL + "api/todoapp/AddNotes", {
      method: "POST",
      body: data
    }).then(res => res.json())
    .then((result) => {
      alert(result);
      this.refreshNotes();
    });
  }

  async deleteClick(){
    fetch(this.API_URL + "api/todoapp/DeleteNotes ? id = " +id , {
      method: "DELETE"
    }).then(res => res.json())
    .then((result) => {
      alert(result);
      this.refreshNotes();
    });
  }

render() {

  const{notes} = this.state;

  return (
    <div className="App">
      <h2 style={{ textAlign: 'center' }}>Todo App</h2>
      <input id='newNotes' />&nbsp;
      <button onClick={() => this.addClick()}>Add Notes</button>
      {notes.map (note => 
        <p>
          <b>* {note.description}</b>&nbsp;
          <button onClick={() => this.deleteClick(note.id)}>Delete Notes</button>
        </p>
      )}
    </div>
  )
}
}

export default App;
*/



import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  API_URL = "http://localhost:5040/";

  componentDidMount() {
    this.refreshNotes();
  }

  async refreshNotes() {
    fetch(this.API_URL + "api/todoapp/GetNotes")
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        this.setState({ notes: data });
      })
      .catch(error => {
        console.error("Error fetching notes:", error);
      });
  }

  async addClick() {
    const newNotes = document.getElementById("newNotes").value;
    const data = new FormData(); // Corrected typo
    data.append("newNotes", newNotes);

    fetch(this.API_URL + "api/todoapp/AddNotes", {
        method: "POST",
        body: data,
    })
        .then((res) => res.json())
        .then((result) => {
            alert(result.message); // Access the message property from the response
            this.refreshNotes();
        })
        .catch((error) => {
            console.error("Error adding note:", error.message);
        });
}

async deleteClick(id) {
    fetch(this.API_URL + "api/todoapp/DeleteNotes?id=" + id, {
        method: "DELETE",
    })
        .then((res) => res.json())
        .then((result) => {
            alert(result.message); // Access the message property from the response
            this.refreshNotes();
        })
        .catch((error) => {
            console.error("Error deleting note:", error.message);
        });
}

render() {
    const { notes } = this.state;

    return (
        <div className="App">
            <h2 style={{ textAlign: "center" }}>Todo App</h2>
            <input id="newNotes" placeholder="Enter new note" />&nbsp;
            <button onClick={() => this.addClick()}>Add Note</button>
            <div>
                {notes.map((note) => (
                    <p key={note.id}> {/* Added key */}
                        <b>* {note.description}</b>&nbsp;
                        <button onClick={() => this.deleteClick(note.id)}>Delete Note</button>
                    </p>
                ))}
            </div>
        </div>
    );
}
}

export default App;
