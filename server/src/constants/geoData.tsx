export const geoData = {
    latitude: {
        degree: 40075 / 360,
        get minute(){
            return this.degree / 60;
        },
        get second(){
            return this.minute /60;
        }
    },
    longitude: {
        degree: 40080/360,
        get minute(){
            return this.degree / 60;
        },
        get second(){
            return this.minute /60;
        }
    }
}