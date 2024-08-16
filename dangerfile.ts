import {
    type GitHubMergeRef,
    type GitHubPRDSL as LibraryGitHubDSL,
    type GitHubRepo,
    danger,
    fail,
} from 'danger';

import { ProjectPrefix } from './project.config';

type GitHubPRDSL = LibraryGitHubDSL & {
    head: GitHubMergeRef & {
        repo: GitHubRepo & {
            has_projects: boolean;
        };
    };
    milestone: Record<string, unknown> | null;
    labels: unknown[];
    project_id: string | null;
};

const BranchPrefix = {
    TASK: 'task',
    FIX: 'fix',
} as const;

const DangerConfig = {
    TITLE: {
        IS_REQUIRED: true,
        PATTERN: new RegExp(
            `^((${
                ProjectPrefix.APP
            })-[0-9]{1,6}): (.*\\S)$|(${ProjectPrefix.ENVIRONMENTS.join(
                '|',
            )}) to (${ProjectPrefix.ENVIRONMENTS.join('|')})$`,
        ),
    },
    ASSIGNEES: {
        IS_REQUIRED: true,
    },
    MILESTONE: {
        IS_REQUIRED: true,
    },
    LABELS: {
        IS_REQUIRED: true,
    },
    BRANCH: {
        IS_REQUIRED: true,
        PATTERN: new RegExp(
            `^((${Object.values(BranchPrefix).join('|')})/(${
                ProjectPrefix.APP
            })-[0-9]{1,6})-[a-zA-Z0-9-]+$|(${ProjectPrefix.ENVIRONMENTS.join(
                '|',
            )})$`,
        ),
    },
};

const pr = danger.github.pr as GitHubPRDSL;

const checkAssignees = (): void => {
    const hasAssignees = Boolean(pr.assignee);

    if (!hasAssignees) {
        fail('This pull request should have at least one assignee.');
    }
};

const checkTitle = (titlePattern: RegExp): void => {
    const isTitleValid = titlePattern.test(pr.title);

    if (!isTitleValid) {
        fail(
            `The pull request title should match the following pattern: ${String(
                titlePattern,
            )}.`,
        );
    }
};

const checkMilestone = (): void => {
    const hasMilestone = Boolean(pr.milestone);

    if (!hasMilestone) {
        fail('This pull request should have a milestone.');
    }
};

const checkLabels = (): void => {
    const hasLabels = pr.labels.length > 0;

    if (!hasLabels) {
        fail('This pull request should have at least one label.');
    }
};

const checkBranch = (branchPattern: RegExp): void => {
    const isBranchValid = branchPattern.test(pr.head.ref);

    if (!isBranchValid) {
        fail(
            `The pull request branch should match the following pattern: ${String(
                branchPattern,
            )}.`,
        );
    }
};

const applyDanger = (): void => {
    if (DangerConfig.TITLE.IS_REQUIRED) {
        checkTitle(DangerConfig.TITLE.PATTERN);
    }

    if (DangerConfig.ASSIGNEES.IS_REQUIRED) {
        checkAssignees();
    }

    if (DangerConfig.MILESTONE.IS_REQUIRED) {
        checkMilestone();
    }

    if (DangerConfig.LABELS.IS_REQUIRED) {
        checkLabels();
    }

    if (DangerConfig.BRANCH.IS_REQUIRED) {
        checkBranch(DangerConfig.BRANCH.PATTERN);
    }
};

applyDanger();
