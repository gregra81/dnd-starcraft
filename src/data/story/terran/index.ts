import type { StoryNode } from '../../../types'
import { terranAct1 } from './act1'
import { terranAct2 } from './act2'
import { terranAct3 } from './act3'
import { terranAct4 } from './act4'

/** מסלול הטראן: ממאר סארה, דרך טרסוניס, ועד הגולם על צ׳אר. */
export const terranNodes: StoryNode[] = [...terranAct1, ...terranAct2, ...terranAct3, ...terranAct4]
