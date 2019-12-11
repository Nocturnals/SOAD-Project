export class JobBrief {
    constructor(title, category, wrokedFor, status, salary = undefined) {
        this.title = title;
        this.category = category;
        this.wrokedFor = wrokedFor;
        this.salary = salary;
        this.status = status;
    }
}
