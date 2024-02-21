"""revert task tables without user_id

Revision ID: 36f00ab5cc83
Revises: a2694f35a7b2
Create Date: 2024-02-21 23:54:30.259255

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '36f00ab5cc83'
down_revision: Union[str, None] = 'a2694f35a7b2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
