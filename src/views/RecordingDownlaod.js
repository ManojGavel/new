import React from 'react'

export default function RecordingDownlaod() {
    return (args) => ({
        placement: 'primary',
        key: 'recordingButton',
        showLabel: true,
        text: true ? 'Stop Recording' : 'Start Recording',
        iconName: true ? 'StopRecording' : 'StartRecording',
        onItemClick: async () => {
            if (!true) {
                console.warn('Recording buton: No serverCallId yet!');
                return;
            }

            if (true) {
                // stop the recording
                // await stopRecording({ serverCallId, recordingId });
                console.log('STOP RECORDNG')
                // setRecordingId('');
                return
            }

            // start the recording
            const { recordingId: newRecordingId } = await startRecording({ serverCallId });
            console.log(newRecordingId, '<---------newRecording id')
            setRecordingId(newRecordingId);
        }
    });
}
