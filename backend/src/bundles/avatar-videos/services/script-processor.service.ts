import { v4 as uuidv4 } from 'uuid';

import {
    type Scene,
    type SceneAvatar,
    type SceneForRenderAvatar,
    type Script,
} from '../types/types.js';

class ScriptProcessor {
    private scenes: Scene[];
    private scripts: Script[];
    private result: SceneForRenderAvatar[] = [];
    private sceneIndex: number = 0;
    private sceneRemainder: number = 0;
    private accumulatedText: string = '';
    private currentVoiceName: string | null = null;
    private currentAvatar: SceneAvatar | null = null;
    private scriptTextRemainder: string = '';

    public constructor(scenes: Scene[], scripts: Script[]) {
        this.scenes = scenes;
        this.scripts = scripts;
        this.initializeScene();
    }

    private initializeScene(): void {
        this.sceneRemainder = this.scenes[this.sceneIndex]?.duration || 0;
        this.currentAvatar = this.scenes[this.sceneIndex]?.avatar || null;
        this.currentVoiceName = this.scripts[0]?.voiceName || null;
    }

    private splitScriptText(
        scriptText: string,
        sceneDuration: number,
        totalScriptDuration: number,
    ): { text: string; remainderText: string } {
        const textLengthForScene = Math.floor(
            (sceneDuration / totalScriptDuration) * scriptText.length,
        );

        if (scriptText.length <= textLengthForScene) {
            return {
                text: scriptText,
                remainderText: '',
            };
        }

        let splitIndex = scriptText.lastIndexOf(' ', textLengthForScene);

        if (splitIndex === -1) {
            splitIndex = scriptText.indexOf(' ', textLengthForScene);
            if (splitIndex === -1) {
                return {
                    text: scriptText,
                    remainderText: '',
                };
            }
        }

        const text = scriptText.slice(0, splitIndex).trim();
        const remainderText = scriptText.slice(splitIndex).trim();

        return { text, remainderText };
    }

    private addSceneResult({
        text,
        voice,
        scene,
    }: {
        text: string;
        voice: string;
        scene: Scene;
    }): void {
        if (!text || !this.currentAvatar) {
            return;
        }

        const lastScene = this.result.at(-1);

        if (
            lastScene &&
            lastScene.avatar.voice === voice &&
            lastScene.avatar.name === this.currentAvatar.name &&
            JSON.stringify(lastScene.background) ===
                JSON.stringify(scene.background)
        ) {
            lastScene.avatar.text += ' ' + text;
        } else {
            this.result.push({
                ...scene,
                id: uuidv4(),
                avatar: {
                    name: this.currentAvatar.name,
                    style: this.currentAvatar.style,
                    text,
                    voice,
                },
            });
        }
    }

    private switchToNextScene(): void {
        this.sceneIndex++;
        if (this.sceneIndex < this.scenes.length) {
            const currentScene = this.scenes[this.sceneIndex];
            this.sceneRemainder = currentScene?.duration ?? 0;
            this.currentAvatar = currentScene?.avatar ?? null;
        }
    }

    private processRemainingScript(script: Script): void {
        const lastResult = this.result.at(-1);

        if (lastResult && lastResult.avatar.voice === script.voiceName) {
            lastResult.avatar.text += ' ' + this.scriptTextRemainder;
        } else {
            this.addSceneResult({
                text: this.scriptTextRemainder,
                voice: script.voiceName,
                scene: this.scenes[this.sceneIndex] as Scene,
            });
        }
    }

    private processScriptForScene(script: Script): void {
        this.scriptTextRemainder = script.text;
        let scriptDurationLeft = script.duration;

        while (scriptDurationLeft > 0 && this.sceneIndex < this.scenes.length) {
            if (
                !this.currentVoiceName ||
                !this.currentAvatar ||
                this.sceneRemainder <= 0
            ) {
                break;
            }

            if (script.voiceName !== this.currentVoiceName) {
                this.addSceneResult({
                    text: this.accumulatedText,
                    voice: this.currentVoiceName,
                    scene: this.scenes[this.sceneIndex] as Scene,
                });
                this.accumulatedText = '';
                this.currentVoiceName = script.voiceName;
            }

            const isScriptShorterThanScene =
                scriptDurationLeft <= this.sceneRemainder;

            if (isScriptShorterThanScene) {
                this.accumulatedText += ' ' + this.scriptTextRemainder;
                this.sceneRemainder -= scriptDurationLeft;
                scriptDurationLeft = 0;
            } else {
                const { text, remainderText } = this.splitScriptText(
                    this.scriptTextRemainder,
                    this.sceneRemainder,
                    script.duration,
                );

                this.accumulatedText += ' ' + text.trim();
                this.scriptTextRemainder = remainderText;
                scriptDurationLeft -= this.sceneRemainder;

                this.addSceneResult({
                    text: this.accumulatedText.trim(),
                    voice: this.currentVoiceName,
                    scene: this.scenes[this.sceneIndex] as Scene,
                });

                this.accumulatedText = '';

                this.switchToNextScene();
            }
        }
    }

    public distributeScriptsToScenes(): SceneForRenderAvatar[] {
        for (const script of this.scripts) {
            this.processScriptForScene(script);

            if (this.sceneIndex >= this.scenes.length && script.duration > 0) {
                this.processRemainingScript(script);
            }
        }

        if (this.accumulatedText) {
            this.addSceneResult({
                text: this.accumulatedText.trim(),
                voice: this.currentVoiceName ?? '',
                scene: this.scenes[this.sceneIndex] as Scene,
            });
        }

        return this.result;
    }
}

export { ScriptProcessor };
