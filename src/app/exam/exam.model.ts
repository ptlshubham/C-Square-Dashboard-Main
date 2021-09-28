export class Question {
    constructor(

        public id?: number,
        public stdid?: number,
        public subid?:number,
        public subname?:string,
        public stdname?:string,
        public testname?:string,
        public totalque?:number,
        public totalmarks?:number,
        public totalminute?:number,
        public createdate?:Date,
        public updateddate?: Date,
        public isactive?: boolean,
        

    ) {
    }
}
