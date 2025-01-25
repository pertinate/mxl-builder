'use client';

import { compressToEncodedURIComponent } from 'lz-string';
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@heroui/react';
import { useBuilderStore } from '~/zustand/builderProvider';
import { characters, compressCharacterData } from '~/zustand/builderStore';
import { useState } from 'react';
import Skill from './skill';

const Test = () => {
    const builder = useBuilderStore(store => store);
    const [currentTree, setTree] = useState<number>(0);
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex gap-4 mx-4 mt-4 justify-between'>
                <div className='flex gap-4'>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button>Change Class</Button>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label='Dynamic Actions'
                            items={Array.from(
                                characters.map(entry => ({
                                    key: entry,
                                    label: entry,
                                }))
                            )}
                            onAction={key => alert(key)}
                        >
                            {item => (
                                <DropdownItem key={item.key}>
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <ButtonGroup>
                        {builder.charData.skillTree.map((tree, treeIdx) => (
                            <Button
                                key={tree.name}
                                onPress={() => setTree(treeIdx)}
                            >
                                {tree.name}
                            </Button>
                        ))}
                    </ButtonGroup>
                </div>
                <Button
                    onPress={
                        () =>
                            window.history.pushState(
                                null,
                                '',
                                `?code=${compressToEncodedURIComponent(
                                    JSON.stringify({
                                        buildName: builder.buildName,
                                        character: builder.character,
                                        charData: compressCharacterData(
                                            builder.charData
                                        ),
                                    })
                                )}`
                            )
                        // router.replace(
                        //     {
                        //         query: compressToEncodedURIComponent(
                        //             JSON.stringify({ test: 'world' })
                        //         ),
                        //     },
                        // )
                    }
                >
                    Save
                </Button>
            </div>
            <div className='grid grid-rows-7 grid-cols-3 gap-4 w-fit'>
                {builder.charData.skillTree[currentTree]?.skills.map(
                    (skill, skillIdx) => (
                        <Skill
                            key={skill.name}
                            treeIdx={currentTree}
                            skillIdx={skillIdx}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default Test;
