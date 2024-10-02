import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [tickets, setTickets] = useState([]);
    const [newTicket, setNewTicket] = useState('');
  
    useEffect(() => {
      const fetchTickets = async () => {
        const response = await axios.get('http://localhost:8000/tickets/');
        setTickets(response.data);
      };
      fetchTickets();
    }, []);
  
    const addTicket = async () => {
      if (!newTicket) return;
  
      await axios.post('http://localhost:8000/tickets/', { title: newTicket });
      setNewTicket('');
      // Refresh tickets
      const response = await axios.get('http://localhost:8000/tickets/');
      setTickets(response.data);
    };
  
    return (
      <div>
        <h1>Kanban Board</h1>
        <input
          type="text"
          value={newTicket}
          onChange={(e) => setNewTicket(e.target.value)}
          placeholder="Add a new ticket"
        />
        <button onClick={addTicket}>Add Ticket</button>
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>{ticket.title}</li>
          ))}
        </ul>
      </div>
    );
}
