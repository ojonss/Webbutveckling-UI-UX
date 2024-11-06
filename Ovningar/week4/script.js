class CharacterFetcher {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.displayArea = document.getElementById('jsonData');
    }

    async fetchData() {
        try {
            const request = await fetch(this.endpoint);
            this.response = await request.json();
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }

    displayData() {
        if (!this.response) {
            console.error("No data available to display. Did you call fetchData()?");

            return;
        }

        for (const field in this.response) {
            if (this.response.hasOwnProperty(field)) {

                if (Array.isArray(this.response[field])) {
                    this.displayArea.innerHTML += field + ":";
                    this.response[field].forEach(item => {
                        this.displayArea.innerHTML += "<br>" + item;
                    });
                } else{
                    this.displayArea.innerHTML += field + ": <br>" + this.response[field] + "<br>";
                }  
            }
        }
    }


    async getDataAndDisplay() {
    await this.fetchData();
    this.displayData();
}

}

// Usage
const characterFetcher = new CharacterFetcher('https://anapioficeandfire.com/api/characters/16');
characterFetcher.getDataAndDisplay();
