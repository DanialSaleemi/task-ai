"""create tasks

Revision ID: addf61c2aee6
Revises: 36f00ab5cc83
Create Date: 2024-02-22 00:02:45.711645

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = 'addf61c2aee6'
down_revision: Union[str, None] = '36f00ab5cc83'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
