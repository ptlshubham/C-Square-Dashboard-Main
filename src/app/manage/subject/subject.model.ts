export class Subject {
    constructor(

        public id?: number,
        public stdid?: number,
        public subject?: string,
        public isactive?: boolean,
        public question?:[],
        public color?:string

    ) {
    }
}
