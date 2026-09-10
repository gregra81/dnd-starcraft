import type { StoryNode } from '../../../types'
import { zergAct1 } from './act1'
import { zergAct2 } from './act2'
import { zergAct3 } from './act3'
import { zergAct4 } from './act4'

/** מסלול הזרג: מהלידה בנחיל ועד הקרב על אייר. */
export const zergNodes: StoryNode[] = [...zergAct1, ...zergAct2, ...zergAct3, ...zergAct4]
