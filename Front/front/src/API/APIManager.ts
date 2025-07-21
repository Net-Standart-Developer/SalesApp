export default class APIManager{
    public static instance:APIManager;

    public BACK_HTTP_SCHEMA:string = "http";
    public BACK_HOST:string = "localhost";
    public BACK_PORT:number = 8000;

    public BACK_URL:string = `${this.BACK_HTTP_SCHEMA}://${this.BACK_HOST}:${this.BACK_PORT}`;
    public BACK_CATEGORIES_URL:string = `${this.BACK_URL}/Categories`;
    public BACK_PRODUCTS_URL:string = `${this.BACK_URL}/Products`;

    public static getInstance(){
        if(APIManager.instance){
            return APIManager.instance;
        }

        APIManager.instance = new APIManager();
        return APIManager.instance;
    }
}