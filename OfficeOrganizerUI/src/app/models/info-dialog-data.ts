export interface InfoDialogData {
    title: string;
    message: string;
    icon: string;
    color: string;
    buttons: { text: string; action: () => void; }[];
}