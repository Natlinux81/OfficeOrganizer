export class Amount {
    constructor(
        public id: string,
        public title : string,
        public amounts: number,
        public earning: boolean,
        public expense: boolean,
        public monthly :boolean,
    ) {}
}