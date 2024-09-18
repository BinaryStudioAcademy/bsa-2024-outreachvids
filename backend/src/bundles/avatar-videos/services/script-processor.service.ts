import { type AvatarData } from '~/common/services/azure-ai/avatar-video/types/types.js';

import { type Scene, type SceneAvatar, type Script } from '../types/types.js';

class ScriptProcessor {
    private scenes: Scene[];
    private scripts: Script[];
    private result: AvatarData[] = [];
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
        return {
            text: scriptText.slice(0, Math.max(0, textLengthForScene)),
            remainderText: scriptText.slice(Math.max(0, textLengthForScene)),
        };
    }

    private addSceneResult({
        text,
        voice,
    }: {
        text: string;
        voice: string;
    }): void {
        if (text && this.currentAvatar) {
            this.result.push({
                text,
                voice,
                name: this.currentAvatar.name,
                style: this.currentAvatar.style,
            });
        }
    }

    private switchToNextScene(): void {
        this.sceneIndex++;
        if (this.sceneIndex < this.scenes.length) {
            const currentScene = this.scenes[this.sceneIndex];
            this.sceneRemainder = currentScene?.duration || 0;
            this.currentAvatar = currentScene?.avatar || null;
        }
    }

    private processRemainingScript(script: Script): void {
        const lastResult = this.result.at(-1);

        if (lastResult && lastResult.voice === script.voiceName) {
            lastResult.text += this.scriptTextRemainder;
        } else {
            this.addSceneResult({
                text: this.scriptTextRemainder,
                voice: script.voiceName,
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
                });
                this.accumulatedText = '';
                this.currentVoiceName = script.voiceName;
            }

            const isScriptShorterThanScene =
                scriptDurationLeft <= this.sceneRemainder;

            if (isScriptShorterThanScene) {
                this.accumulatedText += this.scriptTextRemainder;
                this.sceneRemainder -= scriptDurationLeft;
                scriptDurationLeft = 0;
            } else {
                const { text, remainderText } = this.splitScriptText(
                    this.scriptTextRemainder,
                    this.sceneRemainder,
                    script.duration,
                );

                this.accumulatedText += text;
                this.scriptTextRemainder = remainderText;
                scriptDurationLeft -= this.sceneRemainder;

                this.addSceneResult({
                    text: this.accumulatedText,
                    voice: this.currentVoiceName,
                });

                this.accumulatedText = '';

                this.switchToNextScene();
            }
        }
    }

    public distributeScriptsToScenes(): AvatarData[] {
        for (const script of this.scripts) {
            this.processScriptForScene(script);

            if (this.sceneIndex >= this.scenes.length && script.duration > 0) {
                this.processRemainingScript(script);
            }
        }

        if (this.accumulatedText) {
            this.addSceneResult({
                text: this.accumulatedText,
                voice: this.currentVoiceName || '',
            });
        }

        return this.result;
    }
}

export { ScriptProcessor };
