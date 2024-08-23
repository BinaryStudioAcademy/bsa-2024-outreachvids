import * as sdk from 'microsoft-cognitiveservices-speech-sdk';

import { config } from '~/common/config/config.js';

class AzureService {
    private speechConfig: sdk.SpeechConfig;

    public constructor() {
        const key = config.ENV.AZURE.COGNITIVE_SERVICE_KEY;
        const region = config.ENV.AZURE.COGNITIVE_SERVICE_REGION;

        this.speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
    }

    public getAvatar(
        character: string,
        style: string,
        voiceName: string,
    ): sdk.AvatarConfig {
        this.speechConfig.speechSynthesisVoiceName = voiceName;

        const videoFormat = new sdk.AvatarVideoFormat();
        videoFormat.setCropRange(
            new sdk.Coordinate(600, 50),
            new sdk.Coordinate(1320, 1080),
        );

        const avatarConfig = new sdk.AvatarConfig(
            character,
            style,
            videoFormat,
        );
        avatarConfig.backgroundColor = '#FFFFFFFF';

        return avatarConfig;
    }

    public async textToSpeech(text: string): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const synthesizer = new sdk.SpeechSynthesizer(this.speechConfig);
            synthesizer.speakTextAsync(
                text,
                (result) => {
                    if (
                        result.reason ===
                        sdk.ResultReason.SynthesizingAudioCompleted
                    ) {
                        resolve(result.audioData);
                    } else {
                        reject(
                            new Error(
                                `Speech synthesis canceled, reason = ${sdk.ResultReason[result.reason]}`,
                            ),
                        );
                    }
                    synthesizer.close();
                },
                (error) => {
                    synthesizer.close();
                    reject(error);
                },
            );
        });
    }
}

export { AzureService };
