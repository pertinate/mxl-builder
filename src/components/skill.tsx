'use client';

import { Button, ButtonGroup, Tooltip } from '@heroui/react';
import Image from 'next/image';
import { useMemo } from 'react';
import { cn } from '~/lib/utils';
import { useBuilderStore } from '~/zustand/builderProvider';
import { positionData, Skill } from '~/zustand/builderStore';

type Props = {
    // rowStart: number;
    // colStart: number;
    treeIdx: number;
    skillIdx: number;
};

export default (props: Props) => {
    const builder = useBuilderStore(store => store);
    const skill = useMemo(
        () => builder.charData.skillTree[props.treeIdx]?.skills[props.skillIdx],
        [props.treeIdx, props.skillIdx, builder]
    );
    return (
        <div
            className={cn(
                'relative w-fit row-span-1 col-span-1  flex justify-center flex-col gap-1 ',
                `row-start-${positionData[skill?.name as keyof typeof positionData]?.rowStart}`,
                `col-start-${positionData[skill?.name as keyof typeof positionData]?.colStart}`
            )}
        >
            <div className='relative w-fit'>
                <Tooltip content={skill?.name}>
                    <Image
                        src={`/images/tree/paladin/${skill?.name}.png`}
                        alt={''}
                        width={60}
                        height={80}
                        className='absolute z-1'
                    />
                </Tooltip>
                <Image
                    src={`/images/tree/${skill?.isPassive ? 'passive' : 'skill'}.png`}
                    alt={''}
                    width={60}
                    height={80}
                    className='z-2'
                />
                <span className='absolute -bottom-0.5 mx-auto left-0 right-0 text-center'>
                    {skill?.currentLevel}/{skill?.maxLevel}
                </span>
            </div>

            <ButtonGroup>
                <Button
                    size='sm'
                    className='w-2 h-4 min-w-2'
                    onPress={() =>
                        builder.decrementLevel(props.treeIdx, props.skillIdx)
                    }
                >
                    -
                </Button>
                <Button
                    size='sm'
                    className='w-2 h-4 min-w-2'
                    onPress={() =>
                        builder.incrementLevel(props.treeIdx, props.skillIdx)
                    }
                >
                    +
                </Button>
            </ButtonGroup>
        </div>
    );
};
