export class Studentregister {
    constructor(

        public id?: number,
        public firstname?: string,
        public middlename?: string,
        public lastname?: string,
        public contact?: number,
        public parents?: number,
        public address?: string,
        public city?: string,
        public pincode?: number,
        public email?: string,
        public password?: string,
        public standard?: string,
        public grnumber?: string,
        public transport?: boolean,
        public gender?: any,
        public dateofbirth?: Date,
        public fname?: string,
        public mname?: string,
        public mnumber?: string,
        public schoolname?: string,
        public cmmitfee?: string,
        public cactive?: boolean,
        public pactive?: boolean,
        public mactive?: boolean,
        public profile?: string,
        public batchtime?: string,
        public propic?: string,
        public otp?: number,
        public checked?: boolean,
        public index?: number
    ) {
    }
}
