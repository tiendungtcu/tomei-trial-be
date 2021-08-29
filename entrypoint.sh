#!/bin/bash
set -eu

export GITHUB="true"

sh -c "/bin/drone-ssh $*"
