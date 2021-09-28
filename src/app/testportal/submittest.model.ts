export class SubmittedTest {
    constructor(

        public id?: number,
        public studentid?: number,
        public testid?: number,
        public queid?: number,
        public answer?: string,
        public marks?: number,
        public createddate?: Date,
        public updateddate?: Date,

    ) {
    }
}