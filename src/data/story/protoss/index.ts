import type { StoryNode } from '../../../types'
import { protossAct1 } from './act1'
import { protossAct2 } from './act2'
import { protossAct3 } from './act3'
import { protossAct4 } from './act4'

/** מסלול הפרוטוס: מצ׳או סארה, דרך הגלות, ועד הקרב על אייר. */
export const protossNodes: StoryNode[] = [
  ...protossAct1,
  ...protossAct2,
  ...protossAct3,
  ...protossAct4,
]
