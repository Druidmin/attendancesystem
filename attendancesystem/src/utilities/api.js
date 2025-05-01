async function getAttendance() {
   try {
        const response = await fetch('http://localhost:8000/api/attendance', {
            method: "Get",
        })
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }
        
        const data = await response.json(); 
        console.log(data);
        return data;
    } catch(error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export default getAttendance;