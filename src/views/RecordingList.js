import { mergeStyles, Link, Stack, useTheme } from "@fluentui/react";
import { useEffect, useState } from "react";
import { listRecordings, ServerBlobData } from "./Api";
import { Icon } from '@fluentui/react';


export function RecordingList(props) {
    const { serverCallId } = props;
    const [blobs, setBlobs] = useState([]);

    useEffect(() => {
        const handle = setInterval(async () => {
            if (!serverCallId) {
                return;
            }
            const newRecordings = await listRecordings({ serverCallId });
            if (!listsEqual(newRecordings.blobs, blobs)) {
                // We overwrite the entire list for simplicity.
                setBlobs(newRecordings.blobs);
            }
        }, 500);
        return () => {
            clearInterval(handle);
        }
    }, [serverCallId, blobs, setBlobs]);

    const theme = useTheme();
    return (
        // <Stack className={mergeStyles({
        //     background: theme.palette.neutralDark,
        //     color: theme.palette.white,
        //     padding: '1rem',
        //     height:'5vh',
        //     // The recording names tend to be overly long.
        //     wordBreak: 'break-word'
        // })}>
        //     {blobs.length === 0 && <h3>No recordings in this call yet!</h3>}
        //     {blobs.length > 0 && (<>
        //         <h3>Recordings:</h3>
        //         <ul>
        //             {blobs.map((blob) => <li><Link href={blob.url} target="_blank">{blob.name}</Link></li>)}
        //         </ul>
        //     </>)
        //     }
        // </Stack>

        blobs.length > 0 && <Stack className={mergeStyles({
            background: theme.palette.neutralDark,
            color: theme.palette.white,
            padding: '1rem',
            height: 'auto',
            width: '300px', // Adjust the width as needed
            // position: 'fixed',
            bottom: '1rem',
            right: '1rem',
            wordBreak: 'break-word',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional: add a shadow for better visibility
            zIndex: 1000,// Ensure it appears above other content
            position: 'absolute',

            top: '0',
        })}>
            {/* {blobs.length === 0 && <h3>No recordings in this call yet!</h3>} */}
            {/* {blobs.length > 0 && (<> */}
            <h3>Recordings:</h3>
            {/* <ul>
                {blobs.map((blob) => <li><Link href={blob.url} target="_blank">{blob.name}</Link></li>)}
            </ul> */}
            <ul>
                {blobs.map((blob) => {
                    console.log(blob)
                    const formattedDate = new Intl.DateTimeFormat('en-GB', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }).format(new Date())// Adjust the date format as needed      
                    return (
                        <li key={blob.url}>
                            <Link href={blob.url} target="_blank">
                                <Icon iconName="Download" /> {formattedDate}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {/* </>) */}
            {/* } */}
        </Stack>
    )
}

function listsEqual(first, second) {
    return first.length === second.length && first.every((item, index) => (item === second[index]));
}