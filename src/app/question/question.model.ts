export class Question {
    constructor(

        public id?: number,
        public stdid?: number,
        public subid?: number,
        public subname?: string,
        public stdname?: string,
        public StdName?: string,
        public subject?: string,
        public question?: string,
        public testname?: string,
        public totalque?: number,
        public options?: any[],
        public answer?: string,
        public marks?: number,
        public time?: number,
        public updatedate?: Date,
        public isactive?: boolean,
        public quetype?: any,
        public imageque?: any,
        public optionlist?: string,
        public imageoption?: string,
        public addOptions?: [],
        public testdate?: string,
        public testtime?: string,
        public index?: number




    ) {
    }
}
