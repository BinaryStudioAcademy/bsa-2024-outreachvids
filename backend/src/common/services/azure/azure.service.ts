import * as speechSDK from 'microsoft-cognitiveservices-speech-sdk';

import { config } from '~/common/config/config.js';

class AzureService {
    private speechConfig: speechSDK.SpeechConfig;

    public constructor() {
        const key = config.ENV.AZURE.COGNITIVE_SERVICE_KEY;
        const region = config.ENV.AZURE.COGNITIVE_SERVICE_REGION;

        this.speechConfig = speechSDK.SpeechConfig.fromSubscription(key, region);
    }

    public async getAvatar(
        character: string,
        style: string,
        voiceName: string,
    ): Promise<speechSDK.SynthesisResult> {
        this.speechConfig.speechSynthesisVoiceName = voiceName;
        const iceUrl = config.ENV.AZURE.ICE_URL;
        const iceUsername = config.ENV.AZURE.ICE_USERNAME;
        const iceCredentials = config.ENV.AZURE.ICE_CREDENTIALS;

        const videoFormat = new speechSDK.AvatarVideoFormat();
        videoFormat.setCropRange(
            new speechSDK.Coordinate(600, 50),
            new speechSDK.Coordinate(1320, 1080),
        );

        const avatarConfig = new speechSDK.AvatarConfig(
            character,
            style,
            videoFormat,
        );
        avatarConfig.backgroundColor = '#FFFFFFFF';
        const avatarSynthesizer = new speechSDK.AvatarSynthesizer(this.speechConfig, avatarConfig);

        const peerConnection = new RTCPeerConnection({
            iceServers: [{
                urls: [iceUrl],
                username: iceUsername,
                credential: iceCredentials,
            }]
        });
        peerConnection.addTransceiver('video', { direction: 'sendrecv' });
        peerConnection.addTransceiver('audio', { direction: 'sendrecv' });

        return await avatarSynthesizer.startAvatarAsync(peerConnection);
    }

    public async textToSpeech(text: string): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const synthesizer = new speechSDK.SpeechSynthesizer(this.speechConfig);
            synthesizer.speakTextAsync(
                text,
                (result) => {
                    if (
                        result.reason ===
                        speechSDK.ResultReason.SynthesizingAudioCompleted
                    ) {
                        resolve(result.audioData);
                    } else {
                        reject(
                            new Error(
                                `Speech synthesis canceled, reason = ${speechSDK.ResultReason[result.reason]}`,
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
