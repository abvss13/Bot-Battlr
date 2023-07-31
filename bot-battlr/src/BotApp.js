import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

const BotApp = () => {
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    axios
      .get("http://localhost:8001/bots")
      .then((response) => {
        setBots(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bots:", error);
        setError("Error fetching bots. Please try again later.");
        setLoading(false);
      });
  }, []);

  
  const enlistBot = (botId) => {
    
    const botToEnlist = bots.find((bot) => bot.id === botId);
    if (botToEnlist) {
     
      alert(`You have enlisted ${botToEnlist.name} into your army!`);
    }
  };

  if (loading) {
    return <div className="container loading">Loading...</div>;
  }

  if (error) {
    return <div className="container error">{error}</div>;
  }

  return (
    <div>
      <header className="header">
        
        <h1>Welcome to Bot Battlr</h1>
      </header>
      <div className="container">
        <div className="bot-collection">
          <h2>Bot Collection</h2>
          {bots.map((bot) => (
            <div key={bot.id} className="bot-card">
              <img src={bot.avatar_url} alt={bot.name} className="bot-avatar" />
              <h3>{bot.name}</h3>
              <p>Health: {bot.health}</p>
              <p>Damage: {bot.damage}</p>
              <p>Armor: {bot.armor}</p>
              <button onClick={() => enlistBot(bot.id)}>Enlist</button>
            </div>
          ))}
        </div>
        {}
        {}
      </div>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Bot Battlr</p>
      </footer>
    </div>
  );
};

export default BotApp;
