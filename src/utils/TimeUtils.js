/**
 * all time related utilities function will be stored here 
 * @author Abdul Qawi Bin Kamran 
 * @version 0.0.1
 */

class TimeUtil {

    /**
     * 
     * @param {string in iso 8601} timeSubmitted time when confession was submitted 
     * @return {string} for UI purposes 
     */
    static findWhenPosted(timeSubmitted) {
        const currentTime = new Date(); 
        const submitTime = new Date(timeSubmitted); 
        const diffMinutes = Math.floor((currentTime - submitTime) / (1000*60)); //because in miliseconds 
        const diffHours = Math.floor(diffMinutes / 60); 
        const diffDays = Math.floor(diffHours / 24); 

        switch (true) {
            case (diffMinutes < 1): 
                return `Just now`; 
            case (diffMinutes < 60): 
                return `${diffMinutes} ${diffMinutes === 1 ? `minute` : `minutes`} ago`; 
            case (diffHours < 24): 
                return `${diffHours} ${diffHours === 1 ? `hour` : `hours`} ago`; 
            case (diffDays < 6): 
                return `${diffDays} ${diffDays === 1 ? `day` : `days`} ago`; 
            default: 
                return submitTime.toLocaleDateString('en-US', {
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit', 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    hour12: true
                });
        }
    }
}

export default TimeUtil; 