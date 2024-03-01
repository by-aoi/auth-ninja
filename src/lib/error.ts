export class AuthNinjaError extends Error {
  status: number;
  data: any;

  constructor(props: { status?: number; message: string; data?: any }) {
    super(props.message);
    this.status = props.status ?? 0;
    this.data = props.data;
  }
}
