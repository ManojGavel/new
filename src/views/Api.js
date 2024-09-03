import IP from './IP.json';

export const startRecording = async (req) => {
    const response = await (
        await fetch(`${IP.IP}api/startRecording`, {
            method: 'POST',
            body: JSON.stringify({ serverCallId: req.serverCallId }),
        })
    ).json();
    console.log(`Started recording for ${req.serverCallId}: ${response['recordingId']}`);
    return { recordingId: response['recordingId'] };
}



const payload = [
    {
      EventType: "Microsoft.Communication.RecordingFileStatusUpdated",
      Subject: "serverCallId/12345/recordingId/67890",
      Data: {
        RecordingStorageInfo: {
          RecordingChunks: [
            {
              ContentLocation: "https://example.com/chunk1",
              DocumentId: "doc1",
              Index: 1
            },
            {
              ContentLocation: "https://example.com/chunk2",
              DocumentId: "doc2",
              Index: 2
            }
          ]
        }
      }
    }
  ];
  
  fetch('https://your-function-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));


export const stopRecording = async (req) => {
    await fetch(`${IP.IP}api/stopRecording`, {
        method: 'POST',
        body: JSON.stringify({ serverCallId: req.serverCallId, recordingId: req.recordingId }),
    })
    // .then(res=>{
    //      fetch('http://10.99.32.166:7071/api/onRecordingFileStatusUpdated', {
    //         method: 'POST',
    //         // body: JSON.stringify({ serverCallId: req.serverCallId, recordingId: req.recordingId }),
    //         body: JSON.stringify({
    //             EventType: "Microsoft.Communication.RecordingFileStatusUpdated",
    //             Subject: `serverCallId/${req.serverCallId}/recordingId/${req.recordingId}`,
    //             Data: {
    //                 RecordingStorageInfo: {
    //                     RecordingChunks: [
    //                         {
    //                             ContentLocation: "https://livestreamstoragecontain.blob.core.windows.net/livestreamstoragecontain",
    //                             DocumentId: "doc1",
    //                             Index: 1
    //                         },
    //                         // {
    //                         //     ContentLocation: "https://uscloudcontainer.blob.core.windows.net/livestream?sp=racwdli&st=2024-08-23T05:07:52Z&se=2025-01-01T13:07:52Z&sv=2022-11-02&sr=c&sig=HJ3Z1kNmRuyDh%2F3%2BZ3EW8Gmvft%2F8%2BKJY4h6ee0j%2FBTA%3D",
    //                         //     DocumentId: "doc2",
    //                         //     Index: 2
    //                         // }
    //                     ]
    //                 }
    //             }
    //         }),
    //     })
    // })
    console.log(`Stopped recording for ${req.serverCallId}: ${req.recordingId}`);
}


export const listRecordings = async (req) => {
    return await(
        await fetch(
            `${IP.IP}api/listRecordings?serverCallId=${encodeURIComponent(req.serverCallId)}`,
            { method: "GET" }
        )
    ).json();
}