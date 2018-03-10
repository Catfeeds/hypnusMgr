#!/bin/bash
ps -ef|grep project-hypnus-service-impl | grep -v grep | awk '{print $2}' | xargs kill -9


