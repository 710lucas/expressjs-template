class Container{
    private services;

    constructor(){
        this.services = new Map();
    }

    register(name : string, instance : any){
        this.services.set(name, instance);
    }

    get(name : string){
        const service = this.services.get(name);
        if(!service) throw new Error(`Service ${name} não encontrado no container`);
        return service;
    }
}

export const container = new Container();