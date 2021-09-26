export default class Ticker {

    public get remainder() { return this._remainder; }
    public set remainder(remainder) { if (remainder >= 0) this._remainder = remainder; }
    public callback: (remainder: number) => void = () => { };
    private intervalId?: NodeJS.Timeout;
    private _remainder: number = 0;
    private paused = false;
    private stoped = true;
    async start() {
        this.stoped = false;
        if (this._remainder === 0)
            return Promise.resolve();
        else
            this.callback(this._remainder);

        return new Promise<void>(resolve =>
            this.intervalId = setInterval(() => {
                if (this.stoped) {
                    clearInterval(this.intervalId!);
                    resolve();
                }
                if (this.paused) return;
                if (--this._remainder === 0) {
                    clearInterval(this.intervalId!);
                    resolve();
                } else
                    this.callback(this._remainder);
            }, 1000))
    }

    stop() {
        this.stoped = true;
    }

    resume() {
        this.paused = false;
    }

    pause() {
        this.paused = true;
    }
}