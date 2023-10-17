import logo from '../../../assets/tidaly/LogoTidaly.png'
import '../css/SharedSensorConsumption.css'
import { useEffect, useState } from 'react';

interface FeedProps {
    data: any[]
}

const Feed: React.FC<FeedProps> = ({ data }) => {
    const MINUTE_MS = 1000;
    const [timeSpent, setTimeSpent] = useState('');

    const [lastUpdate, setLastUpdate] = useState(Date.now());

    useEffect(() => {
      setLastUpdate(Date.now());
    }, []);
  
    function calculateTimeSinceUpdate(lastUpdateTimestamp: any) {
      const currentTime = Date.now();
      const elapsedMilliseconds = currentTime - lastUpdateTimestamp;
    
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    
      // Define time intervals
      const secondsInMinute = 60;
      const secondsInHour = 3600;
      const secondsInDay = 86400;
      const secondsInMonth = 2628288;
      const secondInYear = 31536000;
    
      if (elapsedSeconds < secondsInMinute) {
        return `il y a ${elapsedSeconds} ${elapsedSeconds !== 1 ? '' : ''} seconde`;
      } else if (elapsedSeconds < secondsInHour) {
        const minutes = Math.floor(elapsedSeconds / secondsInMinute);
        return `il y a ${minutes} ${minutes !== 1 ? '' : ''} minute`;
      } else if (elapsedSeconds < secondsInDay) {
        const hours = Math.floor(elapsedSeconds / secondsInHour);
        return `il y a ${hours} ${hours !== 1 ? '' : ''} heure`;
      } else if (elapsedSeconds < secondsInMonth) {
        const days = Math.floor(elapsedSeconds / secondsInDay);
        return `il y a ${days} ${days !== 1 ? '' : ''} jour`;
      } else if (elapsedSeconds < secondInYear) {
        const months = Math.floor(elapsedSeconds / secondsInMonth);
        return `il y a ${months} ${months !== 1 ? '' : ''} mois`;
      } else {
        const years = Math.floor(elapsedSeconds / secondInYear);
        return `il y a ${years} ${years !== 1 ? '' : ''} année`;
      }
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setTimeSpent(calculateTimeSinceUpdate(lastUpdate));
        console.log('timespent ' + '\'' + timeSpent + '\'');
      }, MINUTE_MS);
    
      return () => clearInterval(interval);
    }, []);

    return (
        <div >
            <div className="feed" >                    
                {data.map(element =>
                    <div className='feed-content' >
                        <img className='feed-logo' src={logo} />
                        <h4>{element.name} : {element.value} {timeSpent.length <= 1 ? 'il y a 0 seconde' : timeSpent}</h4>
                    </div>)}
            </div>
        </div>
    );
}

export default Feed;
