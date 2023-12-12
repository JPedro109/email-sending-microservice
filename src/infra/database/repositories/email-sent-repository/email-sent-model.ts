export class EmailSentModel {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly subject: string,
        public readonly template: string,
        public readonly context: string,
        public readonly service: string
    ) { }
}