import { makeAutoObservable, runInAction } from "mobx";
import { Phaze } from "./Phaze";
import { Exercize } from "./Exercize"
import Ticker from "./Ticker";
import { Workout } from "./Workout";
import { Instance } from "mobx-state-tree";

const startAudio = new Audio('560188__anthonychartier2020__beep-3.wav');
const endAudio = new Audio('263133__pan14__tone-beep.wav');
export default class Goer {
    constructor(
    ) {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    private ticker = new Ticker();
    public secondsRemains?: number;
    public phazeDuration: number = 0;
    public phazeName: string = "";
    public currentExercize?: Instance<typeof Exercize>;
    public currentPhaze?: Instance<typeof Phaze>;
    public exercizeNumber: number = 0;
    public stoped = true;
    public paused = false;

    tickerCallback(remainder: number, phaze: Instance<typeof Phaze>) {
        if (phaze.duration === remainder)
            startAudio.play();
        if (1 <= remainder && remainder <= 2)
            endAudio.play();
        this.secondsRemains = remainder;
    }

    async start(workout: Instance<typeof Workout>) {
        if (workout === undefined) return;
        const exercizes = workout.workoutExesrcizes.items.map(we => we.ref);
        const existsUndefinedDuration = workout
            .workoutPhazes.items
            .some(wp => wp.ref?.duration === undefined);
        if (existsUndefinedDuration) return;
        const phazes = workout.workoutPhazes.items.map(wp => wp.ref);
        this.stoped = false;
        this.paused = false;
        this.exercizeNumber = 0;
        for (let currentExercize of exercizes) {
            runInAction(() => {
                this.currentExercize = currentExercize;
                this.exercizeNumber++;
            });
            for (let ph of phazes) {
                runInAction(() => {
                    this.currentPhaze = ph;
                    this.phazeName = ph!.name;
                    this.phazeDuration = ph!.duration!;
                });
                this.ticker.remainder = ph!.duration!;
                this.ticker.callback = r => this.tickerCallback(r, ph!)
                await this.ticker.start();
                if (this.stoped) break;
            }
            if (this.stoped) break;
        }
        runInAction(() => {
            this.currentExercize = undefined;
            this.phazeName = "";
            this.exercizeNumber = 0;
            this.stoped = true;
        });
        this.secondsRemains = undefined;
        this.paused = false;
    }

    stop() {
        this.stoped = true;
        this.paused = false;
        this.ticker.stop();
    }
    resume() {
        this.paused = false;
        this.ticker.resume();
    }

    pause() {
        this.paused = true;
        this.ticker.pause();
    }
}