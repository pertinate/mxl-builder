import { decompressFromEncodedURIComponent } from 'lz-string';
import Test from '~/components/test';
import { BuilderStoreProvider } from '~/zustand/builderProvider';
import {
    decompressCharacterData,
    UncompressedData,
} from '~/zustand/builderStore';

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const buildCode = Array.isArray((await searchParams).code)
        ? (((await searchParams).code?.[0] as string) ?? '')
        : (((await searchParams).code as string) ?? '');
    const buildData = JSON.parse(
        decompressFromEncodedURIComponent(buildCode)
    ) as UncompressedData;

    console.log(decompressFromEncodedURIComponent(buildCode));

    return (
        <>
            <BuilderStoreProvider
                state={
                    !!buildData && {
                        ...buildData,
                        charData: decompressCharacterData(buildData.charData),
                    }
                }
            >
                <Test />
            </BuilderStoreProvider>
            {/* <span>{JSON.stringify(buildData)}</span>
            <span>
                {JSON.stringify({
                    ...buildData,
                    charData: decompressCharacterData(buildData.charData),
                })}
            </span> */}
        </>
    );
}
