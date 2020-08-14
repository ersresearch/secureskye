export class DialogCommand {

    text?: string;
    clazz?: string;
    icon?: string;
    command?: Function;

    static ok(command: Function = (() => { /*Noop*/ })) {
        return new DialogCommand('Ok', 'btn-secondary', undefined, command);
    }

    static yes(clazz: string = 'btn-primary', command: Function = (() => { /*Noop*/ })) {
        return new DialogCommand('Ok', clazz, undefined, command);
    }

    static no(command: Function = (() => { /*Noop*/ })) {
        return new DialogCommand('Cancel', 'btn-secondary', undefined, command);
    }

    constructor(text: string, clazz: string, icon: string, command: Function) {
        this.text = text;
        this.clazz = clazz;
        this.icon = icon;
        this.command = command;
    }
}

export interface Dialog {
    title?: string;
    content?: any;
    commands?: DialogCommand[];
}

export class SimpleDialog implements Dialog {
    title: string;
    content?: string;
    commands: DialogCommand[];

    constructor(title: string, content: string, commands: DialogCommand[] = [DialogCommand.ok()]) {
        this.title = title;
        this.content = content;
        this.commands = commands;
    }
}
