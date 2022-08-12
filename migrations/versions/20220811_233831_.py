"""empty message

Revision ID: 28c6910a6ade
Revises: 170c7c96b41f
Create Date: 2022-08-11 23:38:31.487951

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '28c6910a6ade'
down_revision = '170c7c96b41f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('channels', 'server_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('channels', 'server_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    # ### end Alembic commands ###
